var globalgrid;
function loadgrid(e){
    var county = e.target.feature.properties.NAME10,
    state = e.target.feature.properties.STATE,
    caption, zillow;
    
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'http://data.medicare.gov/resource/v287-28n3.json?county_name=' + county + '&state=' + state,
        success: function(return_data)
        {
          globalgrid = return_data
          // remove all data - but the headers!
          $("#Hospitals").find("tr:gt(0)").remove();
          if( return_data.length === 0)
          {
               $('#errormsg').html('Sorry, <strong>no</strong> rows returned!');
               return;
          }
          console.log(return_data);
          caption = 'Hospitals: '+ toTitleCase(return_data[0].county_name) + ' County, ' + return_data[0].state;
          $('#Hospitals').find("caption").text(caption)
          for( var i=0; i < return_data.length; i++ )
          {
             var row = return_data[i];
             if(i % 2 == 0)
             {
                row_string = '<tr><td>';
             }
             else
             {
                row_string = '<tr class="alt"><td>';
            }
             // insert after last row!
             $('#Hospitals > tbody:last').append(row_string + 
             toTitleCase(row.hospital_name) + '</td><td>' + formatPhone(row.phone_number)
             + '</td><td>' + toTitleCase(row.address_1)
             + '</td><td>' + toTitleCase(row.city) + '</td><td>' + row.zip_code
             + '</td><td>' + row.hospital_type + '</td><td>'
             + row.emergency_services + '</td><td>' + row.hospital_owner
             + '</td></tr>');
          }
          /*
          zillow = '<a href="http://www.zillow.com/' + county + '-county' + '-' + state + '/" target="_blank" style="font-size:11px; display:inline;width:222px;float:left;text-decoration:none;color:#999;font-family:arial;font-weight:normal;"><SPAN CLASS="REGION">' + county.toUpperCase() + ' COUNTY</SPAN></a>';
          console.log( $('#rightcolumn').find("search"));
          $('#rightcolumn').find("search").innerHTML(zillow);
          */
        },
        error: function(data, errorText)
        {
          $("#errormsg").html(errorText).show();
        }
      });                     
} 	
