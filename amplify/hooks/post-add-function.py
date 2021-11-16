import os
import json
projectRoot = os.getcwd()
pathToFunctions= projectRoot + '/amplify/backend/function'
tsConfigFileName = 'tsconfig.json'
for functionDirectory in os.listdir(pathToFunctions):
    funcFiles = os.listdir(pathToFunctions+'/'+functionDirectory)
    if(tsConfigFileName not in funcFiles):
        tsConfig = {
            "compilerOptions": {
                "outDir": "./lib",
                "rootDir": "./src",
            },
            "include": ["src/**/*"],
            "exclude": ["node_modules"]
        }
        tsConfigFile = open(pathToFunctions+'/'+functionDirectory+"/"+tsConfigFileName, "w")
        tsConfigFile.write(json.dumps(tsConfig, indent=2, sort_keys=True))
        tsConfigFile.close()

        os.remove(pathToFunctions+'/'+functionDirectory+"/src/index.js") 
        os.remove(pathToFunctions+'/'+functionDirectory+"/src/event.json") 
        indexTsFile = open(pathToFunctions+'/'+functionDirectory+"/src/index.ts", "w")
        indexTsFile.write('console.log("hello world from runtime hooks!");')
        indexTsFile.close()
        print('converted '+ functionDirectory + ' function from js to ts')

