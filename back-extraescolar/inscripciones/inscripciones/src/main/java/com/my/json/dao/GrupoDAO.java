/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.dao;

import com.my.json.db.ConexionDB;
import com.my.json.modelos.Grupo;
import com.my.json.util.Sql;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author DELL
 */

public class GrupoDAO {

    private Grupo mapear(ResultSet rs) throws SQLException {
        Grupo g = new Grupo();
        g.setIdGrupo(rs.getInt("id_grupo"));
        g.setClave(rs.getString("clave"));
        g.setCupoMaximo(rs.getInt("cupo_maximo"));
        g.setCupoMinimo(rs.getInt("cupo_minimo"));
        g.setGenero(rs.getString("genero"));
        g.setIdActividad(rs.getInt("id_actividad"));
        g.setIdUsuario(rs.getInt("id_usuario"));
        return g;
    }

    private int bind(PreparedStatement ps, Grupo g) throws SQLException {
        ps.setString(1, g.getClave());
        Sql.setEntero(ps, 2, g.getCupoMaximo());
        Sql.setEntero(ps, 3, g.getCupoMinimo());
        ps.setString(4, g.getGenero());
        Sql.setEntero(ps, 5, g.getIdActividad());
        Sql.setEntero(ps, 6, g.getIdUsuario());
        return 6;
    }

    public List<Grupo> listar() throws SQLException {
        List<Grupo> lista = new ArrayList<>();
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM grupos ORDER BY id_grupo");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        }
        return lista;
    }

    public Grupo buscarPorId(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM grupos WHERE id_grupo = ?")) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? mapear(rs) : null; }
        }
    }

    public Grupo crear(Grupo g) throws SQLException {
        String sql = "INSERT INTO grupos (clave, cupo_maximo, cupo_minimo, genero, id_actividad, id_usuario) "
                + "VALUES (?,?,?,?,?,?) RETURNING *";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            bind(ps, g);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); return mapear(rs); }
        }
    }

    public boolean actualizar(int id, Grupo g) throws SQLException {
        String sql = "UPDATE grupos SET clave=?, cupo_maximo=?, cupo_minimo=?, genero=?, "
                + "id_actividad=?, id_usuario=? WHERE id_grupo = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            int n = bind(ps, g);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean actualizarParcial(int id, Grupo g) throws SQLException {
        String sql = "UPDATE grupos SET clave=COALESCE(?,clave), cupo_maximo=COALESCE(?,cupo_maximo), "
                + "cupo_minimo=COALESCE(?,cupo_minimo), genero=COALESCE(?,genero), "
                + "id_actividad=COALESCE(?,id_actividad), id_usuario=COALESCE(?,id_usuario) "
                + "WHERE id_grupo = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            int n = bind(ps, g);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean eliminar(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("DELETE FROM grupos WHERE id_grupo = ?")) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}