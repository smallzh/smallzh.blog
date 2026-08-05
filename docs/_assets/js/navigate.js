// Docsify plugin functions
function plugin(hook, vm) {
    hook.afterEach(function (html, next) {
        let flag = '⭐';
        let new_html = html;
        //judge that there are <hr> elements in html
        let n = html.search(/\<hr\/?\>/i)
        if(n > 0){
            //have <hr> element
            let ns = [];
            html.replace(/\<a.*?\/a\>/g,function (match,param,offset) {
                if(match.indexOf(flag) != -1){
                    match.replace(/href=\"(.*?)\".*<span>(.*?)\</g, function (m,p,of) {
                        ns.push({
                            'href': RegExp.$1,
                            'name': RegExp.$2,
                            'weight': RegExp.$2.substring(RegExp.$2.indexOf(flag)).length
                        })
                    })
                }
            })
            // sort by weight
            ns.sort(function(a,b){return b.weight - a.weight});
            // handle href
            if(ns.length > 0){
                let ul = '<ul>';
                ns.forEach(el => {
                    ul = ul + '<li><a href="' + el.href + '">' + el.name + '(' + el.weight + '星)' + '</a>'; 
                })
                ul = ul + '</ul>';
                //add html string
                
                new_html = html.substring(0, n) + ul + html.substring(n);
            }
        }
        // next
        next(new_html)
    })
}

// Docsify plugin options
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins)