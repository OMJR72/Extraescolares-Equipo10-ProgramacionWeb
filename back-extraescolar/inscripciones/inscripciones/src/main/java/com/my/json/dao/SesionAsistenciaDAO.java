/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.dao;

import com.my.json.db.ConexionDB;
import com.my.json.modelos.SesionAsistencia;
import com.my.json.util.Sql;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author DELL
 */

public class SesionAsistenciaDAO {

    private static final String WHERE =
            " WHERE id_inscripcion = ? AND id_horario = ? AND fecha = CAST(? AS DATE)";

    private SesionAsistencia mapear(ResultSet rs) throws SQLException {
        SesionAsistencia s = new SesionAsistencia();
        s.setIdInscripcion(rs.getInt("id_inscripcion"));
        s.setIdHorario(rs.getInt("id_horario"));
        s.setFecha(rs.getString("fecha"));
        s.setEstado(rs.getString("estado"));
        return s;
    }

    private int bind(PreparedStatement ps, SesionAsistencia s) throws SQLException {
        Sql.setEntero(ps, 1, s.getIdInscripcion());
        Sql.setEntero(ps, 2, s.getIdHorario());
        ps.setString(3, s.getFecha());        // CAST(? AS DATE) en el SQL
        ps.setString(4, s.getEstado());
        return 4;
    }

    public List<SesionAsistencia> listar() throws SQLException {
        List<SesionAsistencia> lista = new ArrayList<>();
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "SELECT * FROM sesion_asistencia ORDER BY id_inscripcion, id_horario, fecha");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        }
        return lista;
    }

    public SesionAsistencia buscar(int idInscripcion, int idHorario, String fecha) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM sesion_asistencia" + WHERE)) {
            ps.setInt(1, idInscripcion);
            ps.setInt(2, idHorario);
            ps.setString(3, fecha);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? mapear(rs) : null; }
        }
    }

    public SesionAsistencia crear(SesionAsistencia s) throws SQLException {
        String sql = "INSERT INTO sesion_asistencia (id_inscripcion, id_horario, fecha, estado) "
                + "VALUES (?, ?, CAST(? AS DATE), ?) RETURNING *";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            bind(ps, s);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); return mapear(rs); }
        }
    }

    public boolean actualizar(int idInscripcion, int idHorario, String fecha, SesionAsistencia s)
            throws SQLException {
        String sql = "UPDATE sesion_asistencia SET id_inscripcion=?, id_horario=?, "
                + "fecha=CAST(? AS DATE), estado=?" + WHERE;
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            int n = bind(ps, s);
            ps.setInt(n + 1, idInscripcion);
            ps.setInt(n + 2, idHorario);
            ps.setString(n + 3, fecha);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean actualizarParcial(int idInscripcion, int idHorario, String fecha, SesionAsistencia s)
            throws SQLException {
        String sql = "UPDATE sesion_asistencia SET id_inscripcion=COALESCE(?,id_inscripcion), "
                + "id_horario=COALESCE(?,id_horario), fecha=COALESCE(CAST(? AS DATE),fecha), "
                + "estado=COALESCE(?,estado)" + WHERE;
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            int n = bind(ps, s);
            ps.setInt(n + 1, idInscripcion);
            ps.setInt(n + 2, idHorario);
            ps.setString(n + 3, fecha);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean eliminar(int idInscripcion, int idHorario, String fecha) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("DELETE FROM sesion_asistencia" + WHERE)) {
            ps.setInt(1, idInscripcion);
            ps.setInt(2, idHorario);
            ps.setString(3, fecha);
            return ps.executeUpdate() > 0;
        }
    }
}