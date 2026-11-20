/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.servlets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.my.json.dao.SesionAsistenciaDAO;
import com.my.json.modelos.SesionAsistencia;
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

@WebServlet(urlPatterns = {"/api/sesion-asistencia", "/api/sesion-asistencia/*"})
public class SesionAsistenciaServlet extends HttpServlet {

    private static final String AYUDA = "La URL debe incluir idInscripcion/idHorario/fecha (AAAA-MM-DD)";
    private final SesionAsistenciaDAO dao = new SesionAsistenciaDAO();

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
            if (ids.length != 3) { Http.error(resp, 400, AYUDA); return; }
            SesionAsistencia obj = dao.buscar(Integer.parseInt(ids[0]), Integer.parseInt(ids[1]), ids[2]);
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
            SesionAsistencia obj = Http.MAPPER.readValue(req.getReader(), SesionAsistencia.class);
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
            if (ids.length != 3) { Http.error(resp, 400, AYUDA); return; }
            SesionAsistencia obj = Http.MAPPER.readValue(req.getReader(), SesionAsistencia.class);
            if (dao.actualizar(Integer.parseInt(ids[0]), Integer.parseInt(ids[1]), ids[2], obj))
                Http.mensaje(resp, "Actualizado por completo");
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
            if (ids.length != 3) { Http.error(resp, 400, AYUDA); return; }
            SesionAsistencia obj = Http.MAPPER.readValue(req.getReader(), SesionAsistencia.class);
            if (dao.actualizarParcial(Integer.parseInt(ids[0]), Integer.parseInt(ids[1]), ids[2], obj))
                Http.mensaje(resp, "Actualizado parcialmente");
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
            if (ids.length != 3) { Http.error(resp, 400, AYUDA); return; }
            if (dao.eliminar(Integer.parseInt(ids[0]), Integer.parseInt(ids[1]), ids[2])) Http.mensaje(resp, "Eliminado");
            else Http.error(resp, 404, "No encontrado");
        } catch (NumberFormatException e) {
            Http.error(resp, 400, "Id inválido");
        } catch (SQLException e) {
            Http.errorSql(this, resp, e);
        }
    }
}