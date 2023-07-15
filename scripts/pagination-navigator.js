const postGenerator = require('hexo/dist/plugins/generator/post');

/**
 * Modify previous and next post link
 */
hexo.extend.generator.register('post', function(locals) {
    return postGenerator(locals).map(route => {
        let post = route.data;
        if (post.next) {
            let next = post.next;
            while (next && post.lang !== next.lang) {
                next = next.next;
            }
            post.next = next;
            if (next) {
                next.prev = post;
            }
        }
        if (post.prev) {
            let prev = post.prev;
            while (prev && post.lang !== prev.lang) {
                prev = prev.prev;
            }
            post.prev = prev;
            if (prev) {
                prev.next = post;
            }
        }
        return route;
    });
});