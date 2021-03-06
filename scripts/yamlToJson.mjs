import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const names = [
    'teas',
    'types',
    'families',
    'harvests',
    'cultivars',
    'provinces',
    'towns',
    'picking',
    'brewing-types',
    'themes'
]

const getFilePaths = name => ({
    yamlFile: path.format({
        root: process.cwd(),
        dir: 'data/yaml',
        name: name,
        ext: '.yaml'
    }),
    jsonFile: path.format({
        root: process.cwd(),
        dir: 'data/json',
        name: name,
        ext: '.json'
    })
})

names.forEach(name => convertYamlToJson(getFilePaths(name)))

function convertYamlToJson({ yamlFile, jsonFile }) {
    try {
        const content = yaml.safeLoad(fs.readFileSync(yamlFile), 'utf8')
        if (!fs.existsSync('data/json')) {
            fs.mkdirSync('data/json', { recursive: true })
        }
        fs.writeFileSync(jsonFile, JSON.stringify(content, null, 2), 'utf8')
        console.info('save', jsonFile)
    } catch (e) {
        console.log(`${jsonFile} error:`, e)
    }
}
