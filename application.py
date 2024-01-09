import keras
import numpy as np
from flask import Flask, request, render_template
from keras.utils import img_to_array, load_img
from werkzeug.utils import secure_filename

app = Flask(__name__)

model_path = 'Skin_Disease_Detection.h5'
model = keras.models.load_model(model_path)


@app.route('/', methods=['GET', 'POST'])
def second():
    res = None
    if request.method == 'POST':
        if 'file' not in request.files:
            return 'No file part in the request'
        f = request.files['file']
        filename = secure_filename(f.filename)
        img = load_img(filename, target_size=(75, 100))  # Adjust target_size as per your model's input shape
        x = img_to_array(img)
        x = np.expand_dims(x, axis=0)
        predictions = np.array(model.predict(x))
        max_arg = np.argmax(predictions)
        classes = ["Acne and Rosacea", "Bullous Disease", "Cellulitis Impetigo and other Bacterial Infections",
                   "Eczema", "Warts Molluscum and other Viral Infections"]
        # Make predictions on the input image
        res = classes[max_arg]
    return render_template('index.html', res=res)


if __name__ == "__main__":
    app.run(debug=True)
