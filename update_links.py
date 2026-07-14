import glob

files = glob.glob('*.html')
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('href="#">Our Experts<', 'href="404.html">Our Experts<')
    content = content.replace('href="#">Careers<', 'href="404.html">Careers<')
    content = content.replace('href="#">FAQ<', 'href="404.html">FAQ<')
    content = content.replace('href="#">Shipping Policy<', 'href="404.html">Shipping Policy<')
    content = content.replace('href="#">Return Policy<', 'href="404.html">Return Policy<')
    content = content.replace('href="#">Track Order<', 'href="404.html">Track Order<')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
