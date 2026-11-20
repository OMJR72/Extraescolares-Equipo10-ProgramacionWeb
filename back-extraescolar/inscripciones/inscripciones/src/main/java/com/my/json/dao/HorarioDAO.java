/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.dao;

import com.my.json.db.ConexionDB;
import com.my.json.modelos.Horario;
import com.my.json.util.Sql;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author DELL
 */

public class HorarioDAO {

    private Horario mapear(ResultSet rs) throws SQLException {
        Horario h = new Horario();
        h.setIdHorario(rs.getInt("id_horario"));
        h.setDia(rs.getString("dia"));
        h.setHoraInicio(rs.getString("hora_inicio"));
        h.setHoraFin(rs.getString("hora_fin"));
        h.setIdGrupo(rs.getInt("id_grupo"));
        return h;
    }

    private int bind(PreparedStatement ps, Horario h) throws SQLException {
        ps.setString(1, h.getDia());
        ps.setString(2, h.getHoraInicio());   // se convierte con CAST(? AS TIME) en el SQL
        ps.setString(3, h.getHoraFin());
        Sql.setEntero(ps, 4, h.getIdGrupo());
        return 4;
    }

    public List<Horario> listar() throws SQLException {
        List<Horario> lista = new ArrayList<>();
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM horarios ORDER BY id_horario");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        }
        return lista;
    }

    public Horario buscarPorId(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM horarios WHERE id_horario = ?")) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? mapear(rs) : null; }
        }
    }

    public Horario crear(Horario h) throws SQLException {
        String sql = "INSERT INTO horarios (dia, hora_inicio, hora_fin, id_grupo) "
                + "VALUES (?, CAST(? AS TIME), CAST(? AS TIME), ?) RETURNING *";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            bind(ps, h);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); return mapear(rs); }
        }
    }

    public boolean actualizar(int id, Horario h) throws SQLException {
        String sql = "UPDATE horarios SET dia=?, hora_inicio=CAST(? AS TIME), hora_fin=CAST(? AS TIME), "
                + "id_grupo=? WHERE id_horario = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            int n = bind(ps, h);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean actualizarParcial(int id, Horario h) throws SQLException {
        String sql = "UPDATE horarios SET dia=COALESCE(?,dia), "
                + "hora_inicio=COALESCE(CAST(? AS TIME),hora_inicio), "
                + "hora_fin=COALESCE(CAST(? AS TIME),hora_fin), id_grupo=COALESCE(?,id_grupo) "
                + "WHERE id_horario = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            int n = bind(ps, h);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean eliminar(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("DELETE FROM horarios WHERE id_horario = ?")) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}