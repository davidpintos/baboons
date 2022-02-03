async function postData(url = '', data = {}) {
  console.log(data);

  const response = fetch(url, {
    method: 'POST',
    headers: new Headers({
       'Content-Type': 'application/json'
    }),
    body: JSON.stringify(data)
  }).then(response => response.json());
  
  return response;
}


$( document ).ready(function() {
  $("#form1").append('<input type="button" class="action-btn checkRequired Submit Submitnuevo" name="action" aria-labelledby="action" value="Send" aria-invalid="false">');
  
  $("#form1 input[type='submit']").hide();
  
  $("#form1 .Submitnuevo").click(async( event ) => {
    const days = $("#q1 input").val();
	const amount = $("#q2 input").val();
    
  	if (days.trim() === '' || days.trim() ==='0') {
    	alert('Days are required');
    	$("#q1 input").focus();
		return false;
  	}
      
	window.location.replace("https://dev.velosimo.io/app/payment_adapter/laserfiche/forte/QTQxMjYwNDkzMzo6dkNNeXhfcmVKd0pqcDJrXzRYQ3M=/initialize_payment?amount="+amount);

    event.preventDefault();
    event.stopPropagation();
  });
});
