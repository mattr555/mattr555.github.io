import jinja2, csv, time

template = jinja2.Template(open('template.html').read())
row_headers = ['title', 'url', 'type', 'description', 'technology', 'scrot', 'typeurl']
projects = []

with open('projects.csv') as f:
	reader = csv.reader(f)
	for row in reader:
		projects.append({k: v for k, v in zip(row_headers, row)})

gentime = time.strftime('%c')

with open('index.html', 'w') as f:
	f.write(template.render({'projects': projects, 'time': gentime}))