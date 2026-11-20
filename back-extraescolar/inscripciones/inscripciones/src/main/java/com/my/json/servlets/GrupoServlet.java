/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.servlets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.my.json.dao.GrupoDAO;
import com.my.json.modelos.Grupo;
import com.my.json.util.Http;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
/**
 *
 * @author DELL
 */


@WebServlet(urlPatterns = {"/api/grupos", "/api/grupos/*"})
public class GrupoServlet extends HttpServlet {

    private final GrupoDAO dao = new GrupoDAO();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        if ("PATCH".equalsIgnoreCase(req.getMethod())) doPatch(req, resp);
        else super.service(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            String[] ids = Http.ids(req);
            if (ids.length == 0) { Http.enviar(resp, 200, dao.listar()); return; }
            if (ids.length != 1) { Http.error(resp, 400, "Id inválido"); return; }
            Grupo obj = dao.buscarPorId(Integer.parseInt(ids[0]));
            if (obj == null) Http.error(resp, 404, "No encontrado");
            else Http.enviar(resp, 200, obj);
        } catch (NumberFormatException e) {
            Http.error(resp, 400, "Id inválido");
        } catch (SQLException e) {
            Http.errorSql(this, resp, e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            Grupo obj = Http.MAPPER.readValue(req.getReader(), Grupo.class);
            Http.enviar(resp, 201, dao.crear(obj));
        } catch (JsonProcessingException e) {
            Http.error(resp, 400, "JSON de entrada inválido");
        } catch (SQLException e) {
            Http.errorSql(this, resp, e);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            String[] ids = Http.ids(req);
            if (ids.length != 1) { Http.error(resp, 400, "Falta el id en la URL"); return; }
            Grupo obj = Http.MAPPER.readValue(req.getReader(), Grupo.class);
            if (dao.actualizar(Integer.parseInt(ids[0]), obj)) Http.mensaje(resp, "Actualizado por completo");
            else Http.error(resp, 404, "No encontrado");
        } catch (NumberFormatException | JsonProcessingException e) {
            Http.error(resp, 400, "Id o JSON inválido");
        } catch (SQLException e) {
            Http.errorSql(this, resp, e);
        }
    }

    protected void doPatch(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            String[] ids = Http.ids(req);
            if (ids.length != 1) { Http.error(resp, 400, "Falta el id en la URL"); return; }
            Grupo obj = Http.MAPPER.readValue(req.getReader(), Grupo.class);
            if (dao.actualizarParcial(Integer.parseInt(ids[0]), obj)) Http.mensaje(resp, "Actualizado parcialmente");
            else Http.error(resp, 404, "No encontrado");
        } catch (NumberFormatException | JsonProcessingException e) {
            Http.error(resp, 400, "Id o JSON inválido");
        } catch (SQLException e) {
            Http.errorSql(this, resp, e);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            String[] ids = Http.ids(req);
            if (ids.length != 1) { Http.error(resp, 400, "Falta el id en la URL"); return; }
            if (dao.eliminar(Integer.parseInt(ids[0]))) Http.mensaje(resp, "Eliminado");
            else Http.error(resp, 404, "No encontrado");
        } catch (NumberFormatException e) {
            Http.error(resp, 400, "Id inválido");
        } catch (SQLException e) {
            Http.errorSql(this, resp, e);
        }
    }
}