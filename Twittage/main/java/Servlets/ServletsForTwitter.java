package Servlets;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

@WebServlet("/tweets/*")
public class ServletsForTwitter extends HttpServlet {
    private static Tweets tweets = new Tweets();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String id = request.getParameter("id");
        response.setContentType("application/json");
        response.getWriter().print((new Gson()).toJson(tweets.get(id)));
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        String[] url = request.getRequestURI().split("/");
        if (url.length == 3 && url[2].equals("search")) {
            Gson gson = new Gson();
            response.getWriter().print(tweets.getAll().stream().map(gson::toJson).collect(Collectors.joining("\n")));
        } else {
            response.getWriter().print((new Gson()).toJson(tweets.add((new Gson()).fromJson(request.getReader().readLine(), Tweet.class))));
        }
    }

    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("application/json");
        String[] url = request.getRequestURI().split("/");
        if (url[2].equals("add")) {
            response.getWriter().print((new Gson()).toJson(tweets.add((new Gson()).fromJson(request.getReader().readLine(), Tweet.class))));
        }
        if (url[2].equals("edit")) {
            response.getWriter().print((new Gson()).toJson(tweets.edit(request.getParameter("id"), (new Gson()).fromJson(request.getReader().readLine(), Tweet.class))));
        }
    }
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String id = request.getParameter("id");
        response.setContentType("application/json");
        response.getWriter().print((new Gson()).toJson(tweets.remove(id)));
    }








}