'use strict';

/**
 * Post-generation script: injects additionalPrinterColumns into CRD YAMLs
 * produced by `pepr crd generate`.
 *
 * Pepr's CRD generator does not support additionalPrinterColumns, so we
 * add them after generation. Run this AFTER `pepr crd generate --output`.
 *
 * Usage: node dist/addPrinterColumns.mjs [crds-dir]
 *   crds-dir defaults to ./crds
 */

import fs from 'fs';
import path from 'path';

interface PrinterColumn {
  name: string;
  type: string;
  jsonPath: string;
  description?: string;
  priority?: number;
}

const COLUMNS: Record<string, PrinterColumn[]> = {
  S3Store: [
    { name: 'Endpoint', type: 'string', jsonPath: '.spec.endpoint' },
    { name: 'Bucket', type: 'string', jsonPath: '.spec.bucket' },
    {
      name: 'Ready',
      type: 'string',
      jsonPath: '.status.conditions[?(@.type=="Ready")].status',
      description: 'Whether the S3Store is ready',
    },
  ],
  BackupSchedule: [
    { name: 'Schedule', type: 'string', jsonPath: '.spec.schedule' },
    { name: 'S3Store', type: 'string', jsonPath: '.spec.s3Store.name' },
    {
      name: 'Ready',
      type: 'string',
      jsonPath: '.status.conditions[?(@.type=="Ready")].status',
      description: 'Whether the BackupSchedule is ready',
    },
  ],
  BotModule: [
    { name: 'Image', type: 'string', jsonPath: '.spec.image' },
    {
      name: 'Ready',
      type: 'string',
      jsonPath: '.status.conditions[?(@.type=="Ready")].status',
      description: 'Whether the BotModule is ready',
    },
    { name: 'Size', type: 'integer', jsonPath: '.spec.size', description: 'Number of instances' },
  ],
  BackupRestore: [
    { name: 'Module', type: 'string', jsonPath: '.spec.botModule.name' },
    {
      name: 'Ready',
      type: 'string',
      jsonPath: '.status.conditions[?(@.type=="Ready")].status',
      description: 'Whether the BackupRestore is ready',
    },
  ],
};

function patchYaml(filePath: string, columns: PrinterColumn[]): void {
  const raw = fs.readFileSync(filePath, 'utf8');

  // Match the first version block's start — we inject right after "storage: true"
  // The pepr-generated YAML always has:
  //   - name: v1
  //     served: true
  //     storage: true
  //     schema:
  // We insert additionalPrinterColumns between storage and schema.
  const insertAfter = '      storage: true\n';
  if (!raw.includes(insertAfter)) {
    console.warn(`⚠ ${path.basename(filePath)}: could not find "storage: true" anchor — skipping`);
    return;
  }

  const yamlColumns = columns
    .map(col => {
      let line = `        - name: ${col.name}\n          type: ${col.type}\n          jsonPath: ${col.jsonPath}`;
      if (col.description) line += `\n          description: ${col.description}`;
      if (col.priority) line += `\n          priority: ${col.priority}`;
      return line;
    })
    .join('\n');

  const injection = `      additionalPrinterColumns:\n${yamlColumns}\n`;

  // Only inject if not already present
  if (raw.includes('additionalPrinterColumns:')) {
    console.log(`↳ ${path.basename(filePath)}: already has additionalPrinterColumns — skipping`);
    return;
  }

  const patched = raw.replace(insertAfter, insertAfter + injection);
  fs.writeFileSync(filePath, patched, 'utf8');
  console.log(`✔ ${path.basename(filePath)}: injected ${columns.length} printer columns`);
}

// --- Main ---
const crdsDir = process.argv[2] || path.resolve(import.meta.dirname, '..', 'crds');

for (const [kind, columns] of Object.entries(COLUMNS)) {
  const fileName = `${kind.toLowerCase()}.yaml`;
  const filePath = path.join(crdsDir, fileName);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠ ${fileName} not found in ${crdsDir} — skipping`);
    continue;
  }

  patchYaml(filePath, columns);
}
