// 假设这里是处理 tab 切换的代码 
var tabLabels = document.querySelectorAll('.tabs-tab-button');  
var tabContents = document.querySelectorAll('.tabs-tab-content');  

if(tabLabels && tabContents){
  tabLabels[0].classList.add('active');  
  tabContents[0].classList.add('show');  
  tabLabels.forEach((label,  index) => { 
    label.addEventListener('click',  () => { 
      // 移除所有 tab 标题的激活状态 
      tabLabels.forEach(label  => label.classList.remove('active'));  
      // 移除所有 tab 内容的显示状态 
      tabContents.forEach(content  => content.classList.remove('show')); 
   
      // 添加当前点击 tab 标题的激活状态 
      label.classList.add('active');
      // 显示对应的 tab 内容 
      tabContents[index].classList.add('show'); 
    }); 
  }); 
}
