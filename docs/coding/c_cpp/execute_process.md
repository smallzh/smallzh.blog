# 控制流程

## 循环控制

4 if和goto控制

```c
void main(){
	int n=0; 
　　 printf("please input a string\n"); 
　　 loop: if(getchar()!='\n') 
　　 { 
　　　　n++; 
　　　　goto loop; 
　　 } 
　　 printf("%d",n);
}
```