FROM ubuntu:22.04

# Copy your ~/.vimrc to ./vimrc before building this image
# Or comment this line out
ADD vimrc /root/.vimrc

RUN apt-get update \
    && apt-get install -y vim tmux htop curl zip git \
    && echo "curl -fsSL https://bun.sh/install | bash" > /usr/local/bin/bun-update.sh \
    && chmod 755 /usr/local/bin/bun-update.sh \
    && bun-update.sh

# Common in 'contain' utility
WORKDIR /hostdata

