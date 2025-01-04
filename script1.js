(async () =^> {
    if (1) {
        const path = require('path')
        function handle({ currPath, parentPath }) {
            const files = fs.readdirSync(currPath, { withFileTypes: true });
            files.forEach(file =^> {
                const fullPath = path.join(currPath, file.name)
                if (file.isDirectory()) {
                    handle({ currPath: fullPath, parentPath: currPath });
                } else {
                    const ext = path.extname(file.name).substring(1);
                    if (['txt'].includes(ext.toLowerCase())) {
                        // const basePath = path.basename(currPath);
                        // console.log(newFilePath);
                        // fs.renameSync(fullPath, newFilePath);
                        const main = path.parse(file.name).name;
                        if (main.startsWith('_')) {
                            console.log(main);
                            const content = fs.readFileSync(fullPath).toString();
                            const regex = new RegExp(`\\d+[^【]${main}([^\\s]+)`, 'gm');
                            const txts = [];
                            [...content.matchAll(regex)].forEach(e =^> {
                                let text = e[1];
                                text = text.replaceAll('aaa', 'bbb')
                                txts.push(text);
                            });
                            fs.writeFileSync(path.join(currPath, `_${file.name}`), txts.join('\r\n\r\n'))
                        }
                    }
                }
            })
        };
        handle({ currPath: `C:\\xxx\\20250104` });
        handle({ currPath: `C:\\xxx\\20250101` });
    }
})();
