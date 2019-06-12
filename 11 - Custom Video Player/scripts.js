;(function(){

    const player = document.querySelector('.player');
    const video = player.querySelector('.viewer');
    const progress = player.querySelector('.progress');
    const progressBar = player.querySelector('.progress__filled');
    const toggle = player.querySelector('.toggle');
    const skipButtons = player.querySelectorAll('.skip-button');
    const ranges = player.querySelectorAll('.player__slider');

    function togglePlay() {
        /* 利用[]取值的方式操作功能 */
        // const method = video.paused ? 'play' : 'pause';
        // video[method]();

        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    function updateButton() {
        /* 判斷播放器狀態的事件改變按鈕內容 */
        let icon = this.paused ? '►' : '❚ ❚';
        toggle.textContent = icon;
    }

    function skip() {
        video.currentTime += parseFloat(this.dataset.skip);
    }

    function handleProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
    }

    function handleRangeUpdate() {
        /* 把名稱寫在name裡面，用[]取出來判斷操作 */
        //video.volume, video.playbackRate
        video[this.name] = this.value;
    }

    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }

    // 影片和按鈕
    video.addEventListener('click', togglePlay);
    toggle.addEventListener('click', togglePlay);

    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);

    // 改變時間軸的位置
    video.addEventListener('timeupdate', handleProgress);

    // 往前與往後按鈕
    skipButtons.forEach(button => button.addEventListener('click', skip));

    // 聲音與播放速度
    ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
    ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

    // 滑鼠拖曳
    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => {

        /* 可以利用判斷式的方式精簡程式碼 */
        // mousedown && scrub(e)

        if (mousedown === true) {
            scrub(e)
        }
    });
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);

})();