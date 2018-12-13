$(function () {
    $('.add-article').perfectScrollbar();


    let url = globalAjaxUrl + '/admin/articleType/getAllArticleType';
    pageCommon.getAjax(url, {}, function (res) {
        for (let i = 0; i < res.data.length; i++) {
            $('.article-classification').append('<option value="' + res.data[i].id + '">' + res.data[i].name + '</option>');
        }
        // 数据填充
        let query = pageCommon.getUrlParams();
        let data = $(".article-management-content", parent.document).contents().find('.content-edit').parents('li').attr('data-data');
        if (data) {
            if (query.field == 'edit') {
                data = JSON.parse(data);
                $('.add-article').attr('data-id', data.id);
                $('.article-title').val(data.title);
                $('.article-author').val(data.author);
                $('.article-classification').val(data.typeId);
                $('.add-article-content').val(data.content);
                $('.platform-url').val(data.url);
                $('.article-img img').attr('src',data.imgUrl);
                $('.article-photo').attr('data-src',data.imgUrl);
                $('.fileImg').hide();
                $('.article-img').show();
            }
        }
    });



    $('#fileImg').change(function () {
        var $this = $(this);
        var fr = new FileReader(); // 这个FileReader应该对应于每一个读取的文件都需要重新new一个
        var files = $this[0].files[0]; // files可以获取当前文件输入框中选择的所有文件，返回列表
        fr.readAsDataURL(files); // 读取的内容是加密以后的本地文件路径
        fr.onload = function (e) { // 数据读取完成时触发onload对应的响应函数
            var src = pageCommon.getTokenUrl(e.target.result);
           $('.article-img img').attr('src',src);
           $('.article-photo').attr('data-src',src);
           $('.fileImg').hide();
           $('.article-img').show();
        };
    });


    $('.re-upload').click(function () {
        $('#fileImg').val('');
        $('.article-img img').attr('src','');
        $('.fileImg').show();
        $('.article-img').hide();
    });
});