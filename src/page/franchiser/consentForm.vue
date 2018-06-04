<!-- 同意书-->
<template>
	<div class="c-container">
		<top-header title="申请加盟快乐柠檬确认书" btn="同意" :callback="submit"></top-header>
		<div class="c-page canvas-panel">
      <canvas id="the-canvas"></canvas>
      <img :src="url" alt="">
			<div id="prev">上一页</div>
      <div id="next">下一页</div>
		</div>
    
		<div class="mask c-fixed" v-if="mask" @click="mask=false">
			<div class="msg-box">
				<div class="msg-title fs32 black  fw">申请加盟快乐柠檬确认书</div>
				<div class="mb15 pb20">我已阅读并同意申请加盟快乐柠檬确认书</div>
				<div class="c-flex msg-btn br-t">
					<div class="c-box-flex fs30 gray br-r">取消</div>
					<div class="c-box-flex fs30 green" @click="confirm">同意</div>
				</div>
			</div>
		</div>
    <palette-button></palette-button>
	</div>
</template>
<script>
import topHeader from "../../components/topHeader";
import paletteButton from "../../components/paletteButton";
import PDFJS from "pdfjs-dist";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      mask: false,
      isshowpdf: false,
      url: "src/assets/pdf/relativity.pdf",
      storeID: this.$route.params.storeID
    };
  },
  components: {
    topHeader,paletteButton
  },
  mounted() {
    var img = new Image();
    img.src = "src/assets/pdf/relativity.pdf";
    var url = "src/assets/pdf/relativity.pdf";
    //PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
    
    var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    canvas = document.getElementById('the-canvas'),
    //scale = canvas.width/(document.body.clientWidth*1.65),
    scale = 1.5,
    ctx = canvas.getContext('2d');
    function renderPage(num) {
      pageRendering = true;
      pdfDoc.getPage(num).then(function(page) {
        var viewport = page.getViewport(scale);
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function() {
          pageRendering = false;
          if (pageNumPending !== null) {
            renderPage(pageNumPending);
            pageNumPending = null;
            
          }
        });
      });
    }

    function queueRenderPage(num) {
      if (pageRendering) {
        pageNumPending = num;
      } else {
        renderPage(num);
      }
    }

    function onPrevPage() {
      if (pageNum <= 1) {
        return;
      }
      pageNum--;
      let instance = Toast({
        message: "当前"+pageNum+"页,"+"共"+pdfDoc.numPages+"页",
        position:'bottom',
        duration: -1
      });
      setTimeout(() => {
        instance.close();
      }, 2000);
      queueRenderPage(pageNum);
    }
    document.getElementById('prev').addEventListener('click', onPrevPage);

    function onNextPage() {
      if (pageNum >= pdfDoc.numPages) {
        return;
      }
      pageNum++;
      let instance = Toast({
        message: "当前"+pageNum+"页,"+"共"+pdfDoc.numPages+"页",
        position:'bottom',
        duration: -1
      });
      setTimeout(() => {
        instance.close();
      }, 2000);
      queueRenderPage(pageNum);
    }
    document.getElementById('next').addEventListener('click', onNextPage);

    PDFJS.getDocument(url).then(function(pdfDoc_) {
      pdfDoc = pdfDoc_;
      renderPage(pageNum);
    });
  },
  methods: {
    //保存
    submit() {
      this.mask = true;
    },
    //跳转
    confirm() {
      this.$router.push({ path: "/franchiser/"+this.storeID });
    }
  }
};
</script>
<style lang="less" scoped>
.c-page {
  padding-top: 0.96rem;
}
#the-canvas{
  width: 100%;
}
.mask {
  background: rgba(3, 3, 3, 0.25);
  z-index: 20;
  top: 0;
  width: 100%;
  height: 100%;
}
.msg-box {
  position: absolute;
  text-align: center;
  width: 6rem;
  background-color: #fff;
  border-radius: 0.06rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0.08rem rgba(0, 0, 0, 0.2);
  .msg-title {
    line-height: 1rem;
    text-align: center;
  }
  .msg-btn {
    line-height: 0.88rem;
    text-align: center;
    padding: 0.06rem 0;
  }
}

#prev, #next{
  width: .9rem;
  height: .9rem;
  line-height: .9rem;
  background: #bbb8b8;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  filter:alpha(opacity=80);  
  -moz-opacity:0.80; 
  opacity:0.80;  
}
#prev{
  position: fixed;
  top: 50%;
  left: .2rem;
}
#next{
  position: fixed;
  top: 50%;
  right: .2rem;
}
</style>
