## Nova-Cli

一个用于快速创建项目的CLI工具

### 安装

```
yarn global add nova-cli-tools
// or
npm install nova-cli-tools -g
```

### 命令行指令

```
Usage: nova <command> [options]

Options:
  -V, --version   output the version number
  -i, --info      output some info of the tools
  -h, --help      display help for command

Commands:
  init|i          create a new project from some template projects
  add|a           add a template to local template list
  list|l          show local template list
  delete|d        delete template from local storage
  help [command]  display help for command
```

#### nova init

初始化项目

```bash
$ nova init
? Project name:  wukong
? Project description:  xiyou
? Author:  wukong
? Select one template:  example-template
{
  projectName: 'wukong',
  description: 'xiyou',
  author: 'wukong',
  template: 'example-template'
}
✔ downloading template...
success
✔ Project initialization is complete!
```

#### nova add

添加模板

```bash
$ nova add
? Template Name:  wukong
? Repository name: [git account name]/[git repository name], such as "jiaochunxiao/nova-cli":  jiaochunxiao/wukong
? Is this repository is public? Yes
success
✔ Template has been added successfully!

┌──────────────────┬─────────────────────────┬──────────┐
│ templateName     │ repository              │ isPublic │
├──────────────────┼─────────────────────────┼──────────┤
│ example-template │ jiaochunxiao/template-a │ true     │
├──────────────────┼─────────────────────────┼──────────┤
│ wukong           │ jiaochunxiao/wukong     │ true     │
└──────────────────┴─────────────────────────┴──────────┘
```

#### nova delete

删除模板

```bash
$ nova delete
? The template which you want to delete:  wukong
? Are you sure to delete it? Yes
success
✔ Template has been deleted successfully!

┌──────────────────┬─────────────────────────┬──────────┐
│ templateName     │ repository              │ isPublic │
├──────────────────┼─────────────────────────┼──────────┤
│ example-template │ jiaochunxiao/template-a │ true     │
└──────────────────┴─────────────────────────┴──────────┘
```

#### nova list

本地保存的模板列表

```bash
$ nova list
ℹ Local template list is shown below.

┌──────────────────┬─────────────────────────┬──────────┐
│ templateName     │ repository              │ isPublic │
├──────────────────┼─────────────────────────┼──────────┤
│ example-template │ jiaochunxiao/template-a │ true     │
├──────────────────┼─────────────────────────┼──────────┤
│ wukong           │ jiaochunxiao/wukong     │ true     │
└──────────────────┴─────────────────────────┴──────────┘
```

### todos

- [x] cli基本功能完成
- [ ] 补充基本模板信息
- [ ] 缓存模板项目到本地
