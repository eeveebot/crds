FROM docker.io/alpine:3

RUN set -exu \
  && apk add --no-cache \
    bash \
    kubectl

RUN set -exu \
  && addgroup \
    --gid 1000 \
    kubectl \
  && adduser \
    --disabled-password \
    --gecos "" \
    --home /crds \
    --ingroup kubectl \
    --no-create-home \
    --uid 1000 \
    kubectl

WORKDIR /crds

COPY crds/*.yaml /crds/
COPY entrypoint.sh /

USER kubectl

ENTRYPOINT ["/bin/bash"]
CMD ["/entrypoint.sh"]
