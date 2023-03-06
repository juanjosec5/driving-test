import json

with open('test.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

def parse_question(lines: list[str]):
    question = lines.pop(0).strip()
    # options = { chr(i+97):v for i,v in enumerate(lines) }
    options = {}
    answer = ''

    for i,v in enumerate(lines):
        key = chr(i+97)
        value = v.strip()

        if value[-1] == '*':
            value = value.strip('*')
            answer = value
        options[key] = value

    return { 'question':question, 'options': options, 'answer': answer }



questions = []
temp_lines = []

for line in lines:
    if len(line) <= 1 and len(temp_lines) > 0:
        questions.append(parse_question(temp_lines))
        temp_lines = []
    else:
        temp_lines.append(line)

if len(temp_lines) > 0:
    questions.append(parse_question(temp_lines))


with open('questions.js', 'w', encoding='utf-8') as f:
    
    f.write('export default ')
    f.write(json.dumps(questions, indent=2))

    # f.write('[\n')
