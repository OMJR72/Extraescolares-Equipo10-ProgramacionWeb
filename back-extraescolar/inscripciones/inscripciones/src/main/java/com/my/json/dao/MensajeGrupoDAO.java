/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.dao;

import com.my.json.db.ConexionDB;
import com.my.json.modelos.MensajeGrupo;
import com.my.json.util.Sql;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author DELL
 */

public class MensajeGrupoDAO {

    private MensajeGrupo mapear(ResultSet rs) throws SQLException {
        MensajeGrupo m = new MensajeGrupo();
        m.setIdMensaje(rs.getInt("id_mensaje"));
        m.setContenido(rs.getString("contenido"));
        m.setFechaHora(rs.getString("fecha_hora"));
        m.setIdUsuario(rs.getInt("id_usuario"));
        m.setIdGrupo(rs.getInt("id_grupo"));
        return m;
    }

    private int bind(PreparedStatement ps, MensajeGrupo m) throws SQLException {
        ps.setString(1, m.getContenido());
        Sql.setEntero(ps, 2, m.getIdUsuario());
        Sql.setEntero(ps, 3, m.getIdGrupo());
        return 3;
    }

    public List<MensajeGrupo> listar() throws SQLException {
        List<MensajeGrupo> lista = new ArrayList<>();
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM mensajes_grupo ORDER BY id_mensaje");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        }
        return lista;
    }

    public MensajeGrupo buscarPorId(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM mensajes_grupo WHERE id_mensaje = ?")) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? mapear(rs) : null; }
        }
    }

    public MensajeGrupo crear(MensajeGrupo m) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "INSERT INTO mensajes_grupo (contenido, id_usuario, id_grupo) VALUES (?,?,?) RETURNING *")) {
            bind(ps, m);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); return mapear(rs); }
        }
    }

    public boolean actualizar(int id, MensajeGrupo m) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "UPDATE mensajes_grupo SET contenido=?, id_usuario=?, id_grupo=? WHERE id_mensaje = ?")) {
            int n = bind(ps, m);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean actualizarParcial(int id, MensajeGrupo m) throws SQLException {
        String sql = "UPDATE mensajes_grupo SET contenido=COALESCE(?,contenido), "
                + "id_usuario=COALESCE(?,id_usuario), id_grupo=COALESCE(?,id_grupo) WHERE id_mensaje = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            int n = bind(ps, m);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean eliminar(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("DELETE FROM mensajes_grupo WHERE id_mensaje = ?")) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}