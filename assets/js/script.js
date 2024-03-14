function formatNumber(number) {
  if (isNaN(number) || number == null) {
    return 0;
  } else {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}

$('button').click(function () {
  if ($('input').val().length == 0) {
    return swal('', 'Mohon masukkan nama negara terlebih dahulu', 'warning');
  }
  let countryName = $('input').val().toLowerCase();
  swal({
    title: '',
    text: 'Mencari data . . .',
    icon: 'https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif',
    button: false,
  });
  $.ajax({
    url: 'https://covid-193.p.rapidapi.com/statistics',
    method: 'GET',
    data: {
      country: countryName,
    },
    headers: {
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
      'X-RapidAPI-Key': '48fef861dbmshffcad8e6169f5f4p1f7f16jsnf34bc0befea3',
    },
    success: function (res) {
      if (res.response.length == 0) {
        return swal(
          'Data tidak ditemukan',
          'Pastikan nama negara yang dituliskan benar',
          'warning'
        );
      }
      let data = res.response[0].cases;
      console.log(data);
      // Mengupdate informasi yang ditampilkan pada DOM
      $('.active-case').text(formatNumber(data.active));
      $('.critical-case').text(formatNumber(data.critical));
      $('.new-case').text(formatNumber(data.new));
      $('.recovered').text(formatNumber(data.recovered));
      swal.close();
      // Menuliskan nama negara dengan huruf kapital
      let newCountryName =
        countryName.charAt(0).toUpperCase() + countryName.slice(1);
      $('.nama-negara').text(newCountryName);
      $('.card-statistik').show();
    },
  });
});
