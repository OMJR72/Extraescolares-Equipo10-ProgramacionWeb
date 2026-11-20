/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.dao;

import com.my.json.db.ConexionDB;
import com.my.json.modelos.Requisito;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author DELL
 */

public class RequisitoDAO {

    private Requisito mapear(ResultSet rs) throws SQLException {
        Requisito r = new Requisito();
        r.setIdRequisito(rs.getInt("id_requisito"));
        r.setDescripcion(rs.getString("descripcion"));
        return r;
    }

    private int bind(PreparedStatement ps, Requisito r) throws SQLException {
        ps.setString(1, r.getDescripcion());
        return 1;
    }

    public List<Requisito> listar() throws SQLException {
        List<Requisito> lista = new ArrayList<>();
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM requisitos ORDER BY id_requisito");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        }
        return lista;
    }

    public Requisito buscarPorId(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM requisitos WHERE id_requisito = ?")) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? mapear(rs) : null; }
        }
    }

    public Requisito crear(Requisito r) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "INSERT INTO requisitos (descripcion) VALUES (?) RETURNING *")) {
            bind(ps, r);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); return mapear(rs); }
        }
    }

    public boolean actualizar(int id, Requisito r) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "UPDATE requisitos SET descripcion = ? WHERE id_requisito = ?")) {
            int n = bind(ps, r);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean actualizarParcial(int id, Requisito r) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "UPDATE requisitos SET descripcion = COALESCE(?, descripcion) WHERE id_requisito = ?")) {
            int n = bind(ps, r);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean eliminar(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("DELETE FROM requisitos WHERE id_requisito = ?")) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}
