<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="java.sql.*,java.util.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<title>�����̨</title>
<link href="../CSS/admin.css" rel="stylesheet" type="text/css" />
</head>

<%
	String login = (String) session.getAttribute("LOGIN");
	  if (login == null){
		response.sendRedirect("index.jsp");
}
%>

<%! List displayNews(){
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		List newsList = new ArrayList();
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			con =DriverManager.getConnection("jdbc:oracle:thin:@10.0.34:1521:PRD34","jbit","bdqn");
			stmt = con.createStatement();
			String str = "select * from newsinfo ";
			int maxid =0;
			rs = stmt.executeQuery(str);
			while(rs.next()){
				String news = rs.getInt("nid")+"-"+rs.getString("ntitle")+"-"+rs.getString("nauthor");
				newsList.add(news);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return newsList;
	}
 %>
 
 <% 
 	List nlist = displayNews();
 %>
<body>
<div id="header">
	<div id="welcome">��ӭʹ�����Ź���ϵͳ��</div>
    <div id="nav">
    	<div id="logo"><img src="../Images/logo.jpg" alt="�����й�" /></div>
        <div id="a_b01"><img src="../Images/a_b01.gif" alt="" /></div>
    </div>
</div>

<div id="admin_bar">
<div id="status">����Ա�� ��¼  &#160;&#160;&#160;&#160;    <a href="#">login out</a></div>
    <div id="channel">
    	
    </div>
</div>

<div id="main">
	<div id="opt_list">
    	<ul>
        	<li><a href="news_add.jsp">�������</a></li>
            <li><a href="#">�༭����</a></li>
            <li><a href="#">��������</a></li>
            <li><a href="topic_add.jsp">�������</a></li>
            <li><a href="topicList.jsp">�༭����</a></li>
        </ul>
    </div>
    <div id="opt_area">
    	


	



<script language="javascript">
	function clickdel(){
		return confirm("ɾ������ȷ��");
	}
	
</script>

<ul class="classlist"> 
<%
	for(int i=0;i<nlist.size();i++){
		String[] ninfo = ((String)nlist.get(i)).split("-");
	
 %>
	<li> 
<%=ninfo[1] %>
<span> 
���ߣ� 
<%=ninfo[2] %>                                              
&nbsp;&nbsp;&nbsp;&nbsp; 
<a href="#">�޸�</a> 
&nbsp;&nbsp;&nbsp;&nbsp; 
<a href="#">ɾ��</a> 
</span> 
</li> 
<%
	if ((i % 5 == 0)&&(i!=0)) {
%>
<li class='space'></li>
<%		}
	
	} 

%>
</ul>
    	
    </div>
</div>

<div id="site_link">
	<a href="#">��������</a><span>|</span>
    <a href="#">Aboue Us</a><span>|</span>
    <a href="#">��ϵ����</a><span>|</span>
    <a href="#">������</a><span>|</span>
    <a href="#">�������</a><span>|</span>
    <a href="#">��������</a><span>|</span>
    <a href="#">��Ƹ��Ϣ</a><span>|</span>
    <a href="#">��վ��ͼ</a><span>|</span>
    <a href="#">���Է���</a>
</div>

<div id="footer">
	<p class="">24Сʱ�ͻ��������ߣ�010-68988888  &#160;&#160;&#160;&#160;  <a href="#">����������</a>  &#160;&#160;&#160;&#160;  �������ߣ�010-627488888<br />
	�����������������ٱ��绰��010-627488888  &#160;&#160;&#160;&#160;  �ٱ����䣺<a href="#">jubao@jb-aptech.com.cn</a></p>
    <p class="copyright">Copyright &copy; 1999-2009 News China gov, All Right Reserver<br />
	�����й�   ��Ȩ����</p>	
</div>


</body>
</html>