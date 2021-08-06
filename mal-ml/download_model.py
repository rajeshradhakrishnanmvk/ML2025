# Imports
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Specify model paths
hf_model_path = "distilbert-base-uncased-finetuned-sst-2-english"
local_model_path = "model/distilbert-base-uncased-finetuned-sst-2-english"

# Save the tokenizer and model locally
tokenizer = AutoTokenizer.from_pretrained(hf_model_path)
print("Tokenizer downloaded...")
tokenizer.save_pretrained(local_model_path)
print("Tokenizer saved locally...")
model = AutoModelForSequenceClassification.from_pretrained(hf_model_path)
print("Model downloaded...")
model.save_pretrained(local_model_path)
print("Model saved locally...")
