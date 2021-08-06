import torch
from transformers.pipelines import pipeline
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Specify model paths
local_model_path = "model/distilbert-base-uncased-finetuned-sst-2-english"

# Save the tokenizer and model locally
tokenizer = AutoTokenizer.from_pretrained(local_model_path)

model = AutoModelForSequenceClassification.from_pretrained(local_model_path)

classifier = pipeline('sentiment-analysis',
                      model=model,
                      tokenizer=tokenizer,
                      device=0 if torch.cuda.is_available is True else -1)

output = classifier([
    "I've been waiting for a HuggingFace course my whole life.",
    "I hate this so much!",
    "I love this book"
])

print(output)
