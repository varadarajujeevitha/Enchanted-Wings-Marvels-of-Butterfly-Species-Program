import kagglehub
path = kagglehub.dataset_download("gpiosenka/butterfly-images40-species")
print(path)



%matplotlib inline
import numpy as np
import torch as tc
import matplotlib.pyplot as plt



train_dir = '/kaggle/input/butterfly-images40-species/train'
val_dir = '/kaggle/input/butterfly-images40-species/valid'
test_dir = '/kaggle/input/butterfly-images40-species/test'




from torchvision import datasets, transforms

mean = tc.Tensor([0.485, 0.456, 0.406])
std = tc.Tensor([0.229, 0.224, 0.225])

train_transform = transforms.Compose([
    transforms.RandomResizedCrop(224),
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.RandomVerticalFlip(p=0.5),
    transforms.ToTensor(),
    transforms.Normalize(mean=mean, std=std)
])

test_transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=mean, std=std)
])

train_dataset = datasets.ImageFolder(root=train_dir, transform=train_transform)
val_dataset = datasets.ImageFolder(root=val_dir, transform=test_transform)
test_dataset = datasets.ImageFolder(root=test_dir, transform=test_transform)

print("Number of training samples:", len(train_dataset))
print("Number of validation samples:", len(val_dataset))
print("Number of testing samples:", len(test_dataset))

print("Number of classes:", len(train_dataset.classes))





from torch.utils.data import DataLoader

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True, num_workers=4)
val_loader = DataLoader(val_dataset, batch_size=32, num_workers=4)
test_loader = DataLoader(test_dataset, batch_size=32, num_workers=4)




def imshow(img):
    img = img * std.unsqueeze(1).unsqueeze(2) + mean.unsqueeze(1).unsqueeze(2)
    npimg = img.numpy()
    plt.imshow(np.transpose(npimg, (1, 2, 0)))
    plt.axis('off')
    plt.show()




from torchvision.utils import make_grid

images, labels = next(iter(train_loader))
imshow(make_grid(images))
print(', '.join(f'{train_loader.dataset.classes[labels[i]]}' for i in range(len(labels))))




import torch.nn as nn
import torch
import torch.nn.init as init

model = tc.hub.load('facebookresearch/deit:main', 'deit_tiny_patch16_224', pretrained=True)

for param in model.parameters():
    param.requires_grad = False

num_inputs = model.head.in_features

model.head = nn.Sequential(
    nn.Linear(num_inputs, 1024),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(1024, len(train_dataset.classes))
)

for layer in model.head:
    if isinstance(layer, nn.Linear):
        init.xavier_normal_(layer.weight)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)




import torch.optim as optim
from torchsummary import summary
from timm.loss import LabelSmoothingCrossEntropy

criterion = LabelSmoothingCrossEntropy().cuda()
optimizer = optim.RAdam(model.head.parameters(), lr=1e-3, weight_decay=1e-6,
                        decoupled_weight_decay=True, foreach=True)
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=30)
summary(model, (3, 224, 224))




import time
import torch as tc  # needed for argmax and tensor ops

device = tc.device("cuda" if tc.cuda.is_available() else "cpu")

num_epochs = 30

train_losses = []
val_losses = []
train_accuracies = []
val_accuracies = []

start_time = time.time()

for epoch in range(num_epochs):
    epoch_train_loss = 0
    epoch_val_loss = 0
    epoch_train_corrects = 0
    epoch_val_corrects = 0

    model.train()
    for inputs, targets in train_loader:
        inputs, targets = inputs.to(device), targets.to(device)

        optimizer.zero_grad()
        outputs = model(inputs)

        preds = tc.argmax(outputs, dim=1)

        loss = criterion(outputs, targets)
        epoch_train_loss += loss.item() * inputs.size(0)
        epoch_train_corrects += tc.sum(preds == targets.data).float()

        loss.backward()
        optimizer.step()

    scheduler.step()

    epoch_train_loss /= len(train_dataset)
    epoch_train_accuracy = epoch_train_corrects / len(train_dataset)

    train_losses.append(epoch_train_loss)
    train_accuracies.append(epoch_train_accuracy.cpu())

    model.eval()
    with tc.no_grad():
        for inputs, targets in test_loader:
            inputs, targets = inputs.to(device), targets.to(device)

            val_outputs = model(inputs)
            val_preds = tc.argmax(val_outputs, dim=1)
            val_loss = criterion(val_outputs, targets)
            epoch_val_loss += val_loss.item() * inputs.size(0)
            epoch_val_corrects += tc.sum(val_preds == targets.data).float()

    epoch_val_loss /= len(test_dataset)
    epoch_val_accuracy = epoch_val_corrects / len(test_dataset)

    val_losses.append(epoch_val_loss)
    val_accuracies.append(epoch_val_accuracy.cpu())

    print("Epoch {}/{}: Train Loss = {:.4f}, Val Loss = {:.4f}, Train Acc = {:.4f}, Val Acc = {:.4f}".format(
        epoch + 1, num_epochs, train_losses[-1], val_losses[-1], train_accuracies[-1], val_accuracies[-1]))

end_time = time.time()
training_time = end_time - start_time

print("Training time: {:.2f}s".format(training_time))




plt.plot(range(num_epochs), train_losses, color="red", label="train loss")
plt.plot(range(num_epochs), val_losses, color="blue", label="val loss")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend()
plt.show()




plt.plot(range(num_epochs), train_accuracies, color="red", label="train acc")
plt.plot(range(num_epochs), val_accuracies, color="blue", label="val acc")
plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.legend()
plt.show()




y_test = []
y_pred = []

model.eval()

with tc.no_grad():
    for inputs, targets in test_loader:
        inputs, targets = inputs.to(device), targets.to(device)
        outputs = model(inputs)
        preds = tc.argmax(outputs, dim=1)
        y_test.append(targets)
        y_pred.append(preds)

y_test = tc.cat(y_test).cpu()
y_pred = tc.cat(y_pred).cpu()




from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

print("Accuracy score: {:.4f}".format(accuracy_score(y_test, y_pred)))
print("Precision score: {:.4f}".format(precision_score(y_test, y_pred, average='weighted')))
print("Recall score: {:.4f}".format(recall_score(y_test, y_pred, average='weighted')))
print("F1 score: {:.4f}".format(f1_score(y_test, y_pred, average='weighted')))




from PIL import Image

image1 = Image.open('/kaggle/input/butterfly-images40-species/test/ADONIS/1.jpg')
image2 = Image.open('/kaggle/input/butterfly-images40-species/test/APPOLLO/1.jpg')
image3 = Image.open('/kaggle/input/butterfly-images40-species/test/ATLAS MOTH/1.jpg')

displayed_image1 = image1.resize((256, 256))
displayed_image2 = image2.resize((256, 256))
displayed_image3 = image3.resize((256, 256))

image1 = test_transform(image1).unsqueeze(0).cuda()
image2 = test_transform(image2).unsqueeze(0).cuda()
image3 = test_transform(image3).unsqueeze(0).cuda()

model.eval()

with tc.no_grad():
    output1 = model(image1)
    output2 = model(image2)
    output3 = model(image3)

    prediction1 = tc.argmax(output1, dim=1)
    prediction2 = tc.argmax(output2, dim=1)
    prediction3 = tc.argmax(output3, dim=1)

images = [displayed_image1, displayed_image2, displayed_image3]
predictions = [prediction1, prediction2, prediction3]

for idx, image in enumerate(images):
    plt.figure()
    plt.axis('off')
    plt.imshow(image)
    plt.title('The predicted species is ' + test_loader.dataset.classes[predictions[idx]])



