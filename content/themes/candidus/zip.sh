#!/bin/bash
zip -r dist/Candidus.zip . -x "node_modules/*" -x "dist/*" -x "src/*" -x "tsconfig.json" -x "webpack.config.js" -x "zip.sh" -x "test/*" -x .env
