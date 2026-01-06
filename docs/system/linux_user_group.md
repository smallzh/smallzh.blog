# 用户和用户组

### 用户和用户组管理
#### 用户

1. 用户在系统中分角色，通过全局唯一UID来识别，根据角色不同，**权限**和**执行任务**不同
2. 分为root用户(可执行任何操作)，虚拟用户(不能登录)，普通真实用户(能登录,权限受到限制)

常用命令

1. 添加用户账号useradd或adduser
2. 修改用户usermod
3. 删除用户userdel
4. 用户口令管理passwd
##### 添加用户useradd或adduser
 
useradd [option] [username]
执行以下操作

1. 在/etc/passwd文件中添加一行记录
2. 在/home目录下创建新用户主目录
3. 将/etc/skel目录下文件复制到/home的新用户目录里

注意
 
新用户必须通过passwd设置口令后才能登陆
UID是自动选取，是/etc/passwd文件中的UID加1
GID是自动选取，是/etcc/group文件中GID加1
##### 修改用户usermod
 
usermod [option] [username]
注意

1. 不要用usermod -p [password] 来修改密码，会在/etc/shadow中明文显示
2. usermod只能改变没有登录的用户账号
##### 删除用户userdel
 
userdel [option] [username]
注意

1. 只有一个参数 -r：删除用户同时删除/home的主目录
##### 修改用户密码passwd
 
passwd [option] [username]
用户刚建立时，不能进行登录，必须设置登录密码
注意

1. 普通用户修改自己密码，需要输入原密码，root用户修改密码，直接进行修改
2. passwd设置的密码在/etc/shadow文件中是加密的
#### 用户组
具有相同特征的用户的集合体，和用户的关系为多对多，即一个用户可以属于多个用户组，一个用户组可以包含多个用户
命令

1. 添加用户组：groupadd
2. 修改用户组：groupmod
3. 删除用户组：groupdel
##### groupadd添加用户组
 
groupadd [option] [groupname]
注意

1. 如果指定 -g GID，则创建一个GID的用户组
2. 如果不指定，则会将/etc/group中的最大GID加1设为最新的用户组的GID
##### groupmod修改用户组
 
groupmod [option] [groupname]
#### groupdel删除用户组
 
groupdel [groupname]
注意

1. 如果用户组有用户，则必须先删除用户组里的用户
### 文件和目录操作
文件：存储**信息**的基本_结构_，是一组**信息**的_集合_
linux文件：**无结构的字符流**形式
注意

1. 可以用扩展名来识别文件
2. linux系统以**文件目录**方式来组织和管理所有的文件，以**树形结构**来组织，即_目录_
3. **路径**：从树形目录中的某个目录层次到某个文件的一条道路，分为_绝对路径_和_相对路径_
#### 文件操作命令
命令

1. ls：文件清单命令，列出文件的名称
2. cp：文件复制
3. mv：文件移动
4. rm：文件删除
##### 文件清单命令ls
列出目录下的所有**文件**和**子目录**相关信息
 
ls [option] [file or directory]