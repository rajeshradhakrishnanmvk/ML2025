class SentimentPrediction extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
    }
    set emotions(prediction) {
        //console.log(prediction);
        if (prediction.label == "POSITIVE") {
            this.root.innerHTML = `
            <p style="font-size:50px">&#128522;</p>
            `;
        }
        if (prediction.label == "NEGATIVE") {
            this.root.innerHTML = `
            <p style="font-size:50px">&#128557;</p>
            `;
        }

    }


}

customElements.define('sentiment-pred', SentimentPrediction)