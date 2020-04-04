import os
from PIL import Image

folder_path = "/Users/thrupthin/Desktop/NewGen-IEDC/images/"
# images_list = []

# for files in os.listdir(folder_path):
#     if os.path.isfile(os.path.join(folder_path, files)):
#         images_list.append(files)



current_image = Image.open(folder_path + "SS6.png")
current_image = current_image.resize((600, 500),Image.ANTIALIAS)
current_image.save(folder_path + "SS6.png")
print(current_image.size)




    
