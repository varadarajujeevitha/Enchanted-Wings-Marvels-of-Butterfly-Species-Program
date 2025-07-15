# 🦋 Butterfly Species Classification with Vision Transformers

This project is a deep learning pipeline to classify butterfly species using the [Butterfly Images - 40 Species Dataset](https://www.kaggle.com/datasets/gpiosenka/butterfly-images40-species). We use a pretrained DeiT-tiny Vision Transformer as the backbone, fine-tune it, and evaluate its performance across multiple metrics.

---

## 🚀 Features

* Uses a pretrained **DeiT-tiny ViT** model from Facebook Research
* Fine-tunes a custom classifier head
* Data augmentation and normalization
* Label smoothing and cosine annealing learning rate scheduler
* Evaluation using accuracy, precision, recall, F1 score
* Prediction and visualization of test images

---

## 📁 Dataset Structure

```
/train/
  /ADONIS/
  /APPOLLO/
  ...
/valid/
/test/
```

Total: **40 classes** of butterflies.

---

## 🧠 Model Architecture

```
DeiT-tiny (pretrained, frozen)
│
├── Linear (768 → 1024)
├── ReLU
├── Dropout (p=0.2)
└── Linear (1024 → 40 classes)
```

---

## ⚙️ Training Configuration

* **Loss Function:** LabelSmoothingCrossEntropy
* **Optimizer:** RAdam
* **Learning Rate:** 1e-3
* **Scheduler:** CosineAnnealingLR
* **Epochs:** 30
* **Batch Size:** 32
* **Device:** GPU preferred, falls back to CPU

---

## 📊 Evaluation Metrics

* **Accuracy**
* **Precision (weighted)**
* **Recall (weighted)**
* **F1 Score (weighted)**

Evaluation done using `sklearn.metrics`.

---

## 📷 Sample Prediction Output

![alt text](<butterfly image-1.jpg>)

## 🧠 Notes

* CPU training is slow for ViT models — use GPU via Kaggle or Colab.
* Dataset was downloaded using `kagglehub`.

---

## 🙏 Acknowledgements

* [gpiosenka - Butterfly Dataset](https://www.kaggle.com/datasets/gpiosenka/butterfly-images40-species)
