FROM python:3.7

# Define volume
VOLUME /Classifier

# Set the working directory
WORKDIR /Classifier

RUN apt-get -y update && apt-get install -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Copy just the requirements.txt first to leverage Docker cache
COPY requirements.txt /Classifier/.

# Install packages
RUN pip install -r requirements.txt && \
    rm -rf /root/.cache 

# Copy only the necessary folders/files
COPY config.py /Classifier/.
COPY classification.py /Classifier/.
RUN mkdir model
RUN mkdir model/distilbert-base-uncased-finetuned-sst-2-english
COPY model/distilbert-base-uncased-finetuned-sst-2-english /Classifier/model/distilbert-base-uncased-finetuned-sst-2-english

CMD gunicorn --bind 0.0.0.0:$PORT -c /Classifier/config.py classification:app
# CMD ["gunicorn", "-c", "/Classifier/config.py", "classification:app"]