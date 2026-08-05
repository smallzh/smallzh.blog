import os;

# 获取 目录中 全部的 topic
def get_topic(dir):
    flag = '⭐'
    md_files=[]
    topic_content = {}
    # 获取 全部 md 文件
    for root, dirs, files in os.walk(dir):
        for file in files:
            name = os.path.splitext(file);
            if name[0].upper() != 'README' and not name[0].startswith("_") and name[1] == '.md':  # 想要保存的文件格式
                md_files.append({
                    'file': os.path.join(root, file),
                    'path': '/'.join(os.path.relpath(root, dir).split(os.path.sep)),
                    'file_name': file
                })
    # 遍历文件 提取 topic
    for md_file in md_files:
        with open(md_file['file'], 'r', encoding='utf-8') as f:
            for line in f:
                # 只处理 ##开头 并且 有 flag标记 的 行
                if line.strip().startswith("##") and line.find(flag) > 0:
                    flag_start = line.find(flag)
                    id_start = line.find(":id")
                    # 索引内容
                    index = {
                        'title': line[2:flag_start].strip(),
                        'weight': len(line[flag_start:id_start].strip()),
                        'id': line[id_start + 1:].strip(),
                        'path': md_file['path'] + '/' + os.path.splitext(md_file['file_name'])[0]
                    }
                    # 放入到 topic_content 中
                    if index['weight'] not in topic_content:
                        topic_content[index['weight']] = []
                    topic_content[index['weight']].append({
                        'title': index['title'],
                        'path': index['path'] + '?' + index['id']
                    })

    return topic_content;

# 生成索引文件
def generate_index(tpl, content):
    tpl_content = ''
    # 读取模板文件 内容
    with open(tpl, 'r', encoding='utf-8') as f:
       tpl_content = '\n'.join(f.readlines()) 
    # 替换文本
    for key in content:
        vs = content[key]
        i = 1
        ul = []
        for topic in vs:
            li = '%d. [%s](%s)' % (i, topic['title'], topic['path'])
            ul.append(li)
            i = i + 1
        tpl_content = tpl_content.replace('%dT' % key, str(i-1)).replace('[%d]' % key, '\n'.join(ul))

    return tpl_content;

# 准备路径
dir = os.path.abspath('docs')
tpl = os.path.abspath('_index.tpl')

# 生成 索引内容
content = get_topic(dir);
index_content = generate_index(tpl, content)

# 写入索引文件
index_file = os.path.abspath('docs/_index.md')
with open(index_file, 'w', encoding='utf-8') as f:
    f.write(index_content)