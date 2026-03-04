FROM docker.io/rancher/kubectl:v1.33.7

WORKDIR /crds

COPY crds/*.yaml /crds/
COPY entrypoint.sh /

ENTRYPOINT ["/bin/bash"]
CMD ["/entrypoint.sh"]
