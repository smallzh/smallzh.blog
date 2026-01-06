## 注解相关题目
---
## Spring Boot的核心注解是哪个？⭐ :id=sb-core-anno
> 它主要由哪几个注解组成的

启动类上面的注解是@SpringBootApplication，它也是 Spring Boot 的核心注解，主要组合包含了以下 3 个注解：
1. @SpringBootConfiguration：组合了 @Configuration 注解，实现配置文件的功能。
1. @EnableAutoConfiguration：打开自动配置的功能，也可以关闭某个自动配置的选项，如关闭数据源自动配置功能：             @SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })。
1. @ComponentScan：Spring组件扫描。

## @AutoConfigureAfter或@AutoConfigureBefore如何实现配置文件加载顺序？⭐⭐⭐ :id=config-order
使用@AutoConfigureAfter或@AutoConfigureBefore注解为配置类指定特定的顺序

## SpringBoot自动配置原理是什么？⭐⭐⭐⭐ :id=sb-auto-config
注解 @EnableAutoConfiguration, @Configuration, @ConditionalOnClass 就是自动配置的核心，首先它得是一个配置文件，其次根据类路径下是否有这个类去自动配置。