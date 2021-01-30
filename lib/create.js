const ora = require('ora')
const chalk = require('chalk')
const prompts = require('prompts');
const download = require('download-git-repo')

module.exports = function (proName) {
    createFunc(proName)
}

function createFunc(proName) {

    // 需要下载的技术选择
    const projectList = [
        {
            title: 'vue',
            description: '渐进式JavaScript 框架',
            value: 'vue'
        },
        {
            title: 'react',
            description: '用于构建用户界面的 JavaScript 库',
            value: 'react',
            disabled: true
        },
        {
            title: 'svelet',
            description: '现代编译型JavaScript框架',
            value: 'svelet',
            disabled: true
        }
    ]

    // 配置下载模版的地址
    const vueProjectList = [
        {
            title: 'vue3-ts-template',
            description: '基于webpack5-vue3-typescript的项目模版',
            value: 'vue3-ts-template'
        },
        {
            title: 'vite-vue3-template',
            description: '基于vite-vue3-typescript的项目模版',
            value: 'vite-vue3-template',
            disabled: true
        },
        {
            title: 'snowpack-vue3-template',
            description: 'snowpack-vue3-typescript的项目模版',
            value: 'snowpack-vue3-template',
            disabled: true
        }
    ]
    const reactProjectList = [
        {
            title: 'react-ts-template',
            description: '基于webpack5-react-typescript的项目模版',
            value: 'react-ts-template'
        },
        {
            title: 'vite-react-template',
            description: '基于vite-react-typescript的项目模版',
            value: 'vite-react-template',
            disabled: true
        },
        {
            title: 'snowpack-react-template',
            description: 'snowpack-react-typescript的项目模版',
            value: 'snowpack-react-template',
            disabled: true
        }
    ]
    const sveletProjectList = [
        {
            title: 'svelet-ts-template',
            description: '基于webpack5-svelet-typescript的项目模版',
            value: 'svelet-ts-template'
        },
        {
            title: 'vite-svelet-template',
            description: '基于vite-svelet-typescript的项目模版',
            value: 'vite-svelet-template',
            disabled: true
        },
        {
            title: 'snowpack-svelet-template',
            description: 'snowpack-svelet-typescript的项目模版',
            value: 'snowpack-svelet-template',
            disabled: true
        }
    ]
    let checkType = (prev) => {
        if (prev === 'vue') {
            return vueProjectList
        } else if (prev === 'react') {
            return reactProjectList
        } else if (prev === 'svelet') {
            return sveletProjectList
        }
    }

    const questions = [
        {
            type: 'text',
            name: 'name',
            message: '请输入项目名称?',
            initial: 'trex-demo'
        },
        {
            type: 'select',
            name: 'projectType',
            message: '选择需要创建的项目技术',
            choices: projectList,
            initial: 0
        },
        {
            type: 'select',
            name: 'projectInfo',
            message: '选择项目下载的模版',
            choices: prev => checkType(prev),
            initial: 0
        },
    ];



    (async () => {
        let isDownload = true
        const onCancel = prompts => {
            console.log('退出trex-cli ~');
            isDownload = false
            return false;
        }

        const response = await prompts(questions, { onCancel });
        if (isDownload) {
            console.log(" response", response)
            const spinner = ora(`Loading ${chalk.blue(`正在下载${response.projectType}项目模版`)}`);

            spinner.start()

            spinner.color = 'blue'

            spinner.prefixText = 'trex-cli：'

            const fileUrl = process.cwd() + '/' + response.name

            download(`github:gzg1023/${response.projectInfo}#main`, fileUrl, function (err) {
                if (err) {
                    console.error('错误', err)
                    spinner.text = halk.red(`${response.projectInfo}下载错误`)
                } else {
                    spinner.color = 'green'
                    spinner.text = `${response.projectInfo}模版项目下载完成`
                    spinner.succeed()
                }

            })
        }
    })();



}