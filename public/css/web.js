var myIndex = 0;
carousel();

function carousel() 
{
    var i;
    var x =this.document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) 
    {
        x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) 
    {
        myIndex = 1
    }    
    x[myIndex-1].style.display = "block";  
    this.setTimeout(carousel, 2000); // Change image every 2 seconds
}




   /* <html>
    <head>
        <title> REGISTRATION PORTAL </title>
    </head>
    <body>
        <% String val = request.getParameter("Student_ID");
           String val1 = request.getParameter("Student_name");
          String val2 = request.getParameter("DOB");
          String val3= request.getParameter("Employment_type");
          String val4= request.getParameter("Designation");
          String val5= request.getParameter("Current_country");
          String val6= request.getParameter("Current_state");
          String val7= request.getParameter("Current_city");
          String val8= request.getParameter("Current_address");
          String val9= request.getParameter("Campus");
          String val10= request.getParameter("College");
          String val11= request.getParameter("Branch");
          String val12= request.getParameter("Year_of_Passing");
          String val13= request.getParameter("Email");
          String val14= request.getParameter("Phone");
        %>
    </body>
    <h2> The data entered was : </h2>  
    <br/><%=val%> <br/>
    <br/><%=val1%><br/>
    <br/><%=val2%><br/>
    <br/><%=val3%><br/>
    <br/><%=val4%><br/>
    <br/><%=val5%><br/>
    <br/><%=val6%><br/>
    <br/><%=val7%><br/>
    <br/><%=val8%><br/>
    <br/><%=val9%><br/>
    <br/><%=val10%><br/>
    <br/><%=val11%><br/>
    <br/><%=val12%><br/>
    <br/><%=val13%><br/>
    <br/><%=val14%><br/>
</html>*/



