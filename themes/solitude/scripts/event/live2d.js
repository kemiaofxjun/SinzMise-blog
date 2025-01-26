"use strict";

hexo.extend.generator.register('script', function() {
  const config = hexo.theme.config.live2d;
  if (!(config == null ? void 0 : config.enable))
    return;
  const data = {
    option: config.option ? config.option : {},
    then: config.then ? config.then : ""
  };
  const JsList = [];
  for (const key in data.option) {
    if (Object.prototype.hasOwnProperty.call(data.option, key)) {
      const element = data.option[key];
      if (key === "parentElement") {
        JsList.push(`parentElement:${element}`);
      } else if (key === "menus") {
        if (typeof element === "object") {
          const menusList = [];
          for (const menusKey in element) {
            if (Object.prototype.hasOwnProperty.call(element, menusKey)) {
              const menusElement = element[menusKey];
              if (menusKey === "items") {
                if (Array.isArray(menusElement)) {
                  if (menusElement.some((item) => item.onClick)) {
                    const itemsList = [];
                    for (const item of menusElement) {
                      const itemList = [];
                      for (const itemKey in item) {
                        if (Object.prototype.hasOwnProperty.call(item, itemKey)) {
                          const itemElement = item[itemKey];
                          if (itemKey === "onClick") {
                            itemList.push(`${itemKey}:${itemElement}`);
                          } else {
                            itemList.push(`${itemKey}:${JSON.stringify(itemElement)}`);
                          }
                        }
                      }
                      itemsList.push(`{${itemList.join(",")}}`);
                    }
                    menusList.push(`items:[${itemsList.join(",")}]`);
                  } else {
                    menusList.push(`items:${JSON.stringify(menusElement)}`);
                  }
                } else {
                  menusList.push(`items:${menusElement}`);
                }
              } else {
                menusList.push(`${menusKey}:${JSON.stringify(menusElement)}`);
              }
            }
          }
          JsList.push(`${key}:{${menusList.join(",")}}`);
        } else {
          JsList.push(`${key}:${element}`);
        }
      } else if (key === "tips") {
        if (typeof element === "object") {
          const tipsList = [];
          for (const tipsKey in element) {
            if (Object.prototype.hasOwnProperty.call(element, tipsKey)) {
              const tipsElement = element[tipsKey];
              if (tipsKey === "idleTips") {
                const idleTipsList = [];
                for (const idleTipsKey in tipsElement) {
                  if (Object.prototype.hasOwnProperty.call(tipsElement, idleTipsKey)) {
                    const idleTipsElement = tipsElement[idleTipsKey];
                    if (idleTipsKey === "wordTheDay") {
                      idleTipsList.push(`wordTheDay:${idleTipsElement}`);
                    } else if (idleTipsKey === "message") {
                      if (Array.isArray(idleTipsElement)) {
                        idleTipsList.push(`message:${JSON.stringify(idleTipsElement)}`);
                      } else {
                        idleTipsList.push(`message:${idleTipsElement}`);
                      }
                    } else {
                      idleTipsList.push(`${idleTipsKey}:${JSON.stringify(idleTipsElement)}`);
                    }
                  }
                }
                tipsList.push(`idleTips:{${idleTipsList.join(",")}}`);
              } else {
                tipsList.push(`${tipsKey}: ${JSON.stringify(tipsElement)}`);
              }
            }
          }
          JsList.push(`${key}:{${tipsList.join(",")}}`);
        } else {
          JsList.push(`${key}:${element}`);
        }
      } else {
        JsList.push(`${key}:${JSON.stringify(element)}`);
      }
    }
  }
  const user_info_js = "const oml2d = OML2D.loadOml2d({" + JsList.join(",") + "});" + data.then;
  return {
    path: "js/loadlive2d.js",
    data: function(){
      return hexo.render.renderSync({text: user_info_js, engine: 'js'});
    }
  };
});
