
# Imports
import torch
import os
from transformers.pipelines import pipeline
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from flask import Flask, request
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)


class Classifier():

    def __init__(self, data):
        self.model_path = os.path.join(
            os.getcwd() + "/model/distilbert-base-uncased-finetuned-sst-2-english/")
        self.model = AutoModelForSequenceClassification.from_pretrained(self.model_path,
                                                                        local_files_only=True)
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_path,
                                                       local_files_only=True)
        self.classifier = pipeline('sentiment-analysis',
                                   model=self.model,
                                   tokenizer=self.tokenizer,
                                   device=0 if torch.cuda.is_available is True else -1)
        self.data = data

    def get_classifier(self):
        output = self.classifier(self.data)
        return {'classified': output}


class Classify(Resource):
    def post(self):
        try:
            # Decode json object from the request
            json_object = request.get_json()
            data = json_object["text"]
            obj = Classifier(data)
        except Exception as e:
            return {"Message": "Error in creating Classifier object" + str(e)}
        status = obj.get_classifier()
        return status


api.add_resource(Classify, '/api/get-classify')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5069))
    app.run(host='0.0.0.0', port=port)
    #app.run(host='0.0.0.0', port=5069, debug=False)
