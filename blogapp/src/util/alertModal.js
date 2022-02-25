import 'alertifyjs/build/css/themes/bootstrap.min.css';
import * as alertify from 'alertifyjs';

function showAlert(message, isFailed = false, timeout = 6) {
  alertify.set('notifier', 'position', 'top-center');
  let type = isFailed ? 'error' : 'success';
  alertify.notify(message, type, timeout, function () {});
}

//common info model for show the information each user input
const showTooltipInfo = (text) => {
  return (
    <>
      <article className="popinfo">
        <div>
          <span>{text}</span>
        </div>
      </article>
    </>
  );
};

export { showAlert, showTooltipInfo };
