# First stage - build and install
FROM python:3.9.6-slim as builder

# install pre-requisites
RUN apt-get update && apt-get install -y libpq-dev gcc

# set up non-root user
RUN groupadd --gid 1000 worker &&\
    useradd --home-dir /home/worker --create-home --uid 1000\
        --gid 1000 --shell /bin/bash --skel /dev/null worker
COPY .bashrc /home/worker
USER worker

# install dependencies
WORKDIR /app
COPY ./requirements.txt /app/
RUN pip install --user --no-warn-script-location -r requirements.txt
COPY ./dev.requirements.txt /app/
RUN pip install --user --no-warn-script-location -r dev.requirements.txt


# Second stage - transplant code into a clean image
FROM python:3.9.6-slim as app

# set up non-root user
RUN groupadd --gid 1000 worker &&\
    useradd --home-dir /home/worker --create-home --uid 1000\
        --gid 1000 --shell /bin/bash --skel /dev/null worker
COPY .bashrc /home/worker
USER worker

# set environment variable for python access to stdout in container
ENV PYTHONUNBUFFERED 1

# designate working directory
WORKDIR /app

# copy over app from build stage
COPY --from=builder /home/worker/.local /home/worker/.local

# update the path variable
ENV PATH=/worker/.local/bin:$PATH
