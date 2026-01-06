# llm从<部署>到<微调>到<运行>

## 1 基础
1. ollama: 本地大模型运行框架，有点类似docker，而其中的模型类似镜像
2. huggingface: 各种框架(Pytorch)下的大模型“朋友圈”，类似github，只是前者是“模型”的汇聚，后者是“代码”的汇聚
3. llama.cpp: 目标是能够在各种硬件上实现LLM推理，只需最少的设置，并提供最先进的性能。提供1.5位、2位、3位、4位、5位、6位和8位整数量化，以加快推理速度并减少内存使用。 -> 需要理解的 关键概念（模型量化、模型格式<gguf、bin>、模型加载、模型推理、模型Api服务）
4. Unsloth: 一个开源的大模型训练加速项目，可以显著提升大模型的训练速度（提高2-5 倍），减少显存占用（最大减少80%）。 -> 需要理解的 关键概念（LoRA模型、模型加载、超参数、LoRA训练参数）
5. LLaMA Factory: ??
   


## 附录
1. ollama: 官网[https://ollama.com/](https://ollama.com/)
2. huggingface: 官网[https://huggingface.co/](https://huggingface.co/)
3. llama.cpp: github地址[https://github.com/ggerganov/llama.cpp](https://github.com/ggerganov/llama.cpp)
4. Unsloth: github地址[https://github.com/unslothai/unsloth](https://github.com/unslothai/unsloth)
5. LLaMA Factory: github地址[https://github.com/hiyouga/LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory)

---
1.
Chinese-LLaMA-Alpaca-3
: github地址[https://github.com/ymcui/Chinese-LLaMA-Alpaca-3](https://github.com/ymcui/Chinese-LLaMA-Alpaca-3)

---
GPU算力租用服务器
1.
潞晨云文档: [https://cloud.luchentech.com/doc/docs/intro](https://cloud.luchentech.com/doc/docs/intro)