## 介绍
- 本文使用【静态站点生成器MkDocs】进行网站搭建
  - MkDocs官网： https://www.mkdocs.org/ 
- MkDocs中包含多种第三方主题，本文使用主题：【MkDocs Material主题】
  - MkDocs Material 主题官网： https://squidfunk.github.io/mkdocs-material/getting-started/


## 部署 
- 本地部署
  - python环境准备（建议使用在虚拟环境中使用python3）
    - pip install mkdocs-material
  - 启动：（记得加sudo，默认监听800端口， ）
    - sudo mkdocs serve
  - 本地访问：
    - http://127.0.0.1:8000/

- github-pages部署
  - github中创建【用户名.github.io】的仓库
  - action配置文件已经定义好在.github/workflows目录下，只需要在github仓库中配置好mkdocs.yml文件即可
  - 需要在github仓库setting->Pages中配置：
    - Source配置【Dyploy from a branch】
    - Branch配置【gh-pages】/ 
  - 后续每次提交到main分支即可，github action会自动部署项目到gh-pages分支，并自动更新github-pages
  - 远程访问：https://用户名.github.io

