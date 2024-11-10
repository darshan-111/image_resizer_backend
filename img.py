from PIL import Image
import os
import sys


def resize_img(input , output , width=None , height=None , quality=50):
    with Image.open(input) as image:
        if not width and not height:
            width, height = image.size
        elif not height:
            height = int(image.height * (width / image.width))
        elif not width:
            width = int(image.width * (height / image.heigth))

        image = image.resize((width , height))
        image.save(output , optimize=True, quality=quality)
        print(input)
        print("image reduced")

def resize_img_dir(input , output , width=None , height=None , quality=80):
    if not os.path.exists(output):
        os.makedirs(output)
    for filename in os.listdir(input):
        if filename.endswith('.jpg') or filename.endswith('.jpeg') or filename.endswith('.png'):
            input_path = os.path.join(input , filename)
            output_path = os.path.join(output , filename)
            resize_img(input_path , output_path , width , height, quality)




input_dir = sys.argv[1]
output_dir = sys.argv[2]
width =  int(sys.argv[3]) if sys.argv[3]!= 'org' else None
height  = int(sys.argv[4]) if sys.argv[4]!= 'org' else None
quality = int(sys.argv[5])

resize_img(input_dir , output_dir , width , height , quality)