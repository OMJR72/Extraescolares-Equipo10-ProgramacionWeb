/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.dao;

import com.my.json.db.ConexionDB;
import com.my.json.modelos.Usuario;
import com.my.json.util.Sql;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author DELL
 */

public class UsuarioDAO {

    private Usuario mapear(ResultSet rs) throws SQLException {
        Usuario u = new Usuario();
        u.setIdUsuario(rs.getInt("id_usuario"));
        u.setNombre(rs.getString("nombre"));
        u.setApellidoP(rs.getString("apellido_p"));
        u.setApellidoM(rs.getString("apellido_m"));
        u.setEmail(rs.getString("email"));
        // el password no se carga nunca
        u.setTelefono(rs.getString("telefono"));
        u.setEmailInstitucional(rs.getString("email_institucional"));
        u.setNoDeControl(rs.getString("no_de_control"));
        u.setGenero(rs.getString("genero"));
        u.setIdRol(rs.getInt("id_rol"));
        u.setIdCarrera(Sql.entero(rs, "id_carrera"));
        return u;
    }

    private int bind(PreparedStatement ps, Usuario u) throws SQLException {
        ps.setString(1, u.getNombre());
        ps.setString(2, u.getApellidoP());
        ps.setString(3, u.getApellidoM());
        ps.setString(4, u.getEmail());
        ps.setString(5, u.getPassword());
        ps.setString(6, u.getTelefono());
        ps.setString(7, u.getEmailInstitucional());
        ps.setString(8, u.getNoDeControl());
        ps.setString(9, u.getGenero());
        Sql.setEntero(ps, 10, u.getIdRol());
        Sql.setEntero(ps, 11, u.getIdCarrera());
        return 11;
    }

    public List<Usuario> listar() throws SQLException {
        List<Usuario> lista = new ArrayList<>();
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM usuarios ORDER BY id_usuario");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        }
        return lista;
    }

    public Usuario buscarPorId(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM usuarios WHERE id_usuario = ?")) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? mapear(rs) : null; }
        }
    }

    public Usuario crear(Usuario u) throws SQLException {
        String sql = "INSERT INTO usuarios (nombre, apellido_p, apellido_m, email, password, telefono, "
                + "email_institucional, no_de_control, genero, id_rol, id_carrera) "
                + "VALUES (?,?,?,?,?,?,?,?,?,?,?) RETURNING *";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            bind(ps, u);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); return mapear(rs); }
        }
    }

    public boolean actualizar(int id, Usuario u) throws SQLException {
        String sql = "UPDATE usuarios SET nombre=?, apellido_p=?, apellido_m=?, email=?, password=?, "
                + "telefono=?, email_institucional=?, no_de_control=?, genero=?, id_rol=?, id_carrera=? "
                + "WHERE id_usuario = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            int n = bind(ps, u);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean actualizarParcial(int id, Usuario u) throws SQLException {
        String sql = "UPDATE usuarios SET nombre=COALESCE(?,nombre), apellido_p=COALESCE(?,apellido_p), "
                + "apellido_m=COALESCE(?,apellido_m), email=COALESCE(?,email), "
                + "password=COALESCE(?,password), telefono=COALESCE(?,telefono), "
                + "email_institucional=COALESCE(?,email_institucional), "
                + "no_de_control=COALESCE(?,no_de_control), genero=COALESCE(?,genero), "
                + "id_rol=COALESCE(?,id_rol), id_carrera=COALESCE(?,id_carrera) WHERE id_usuario = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            int n = bind(ps, u);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean eliminar(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("DELETE FROM usuarios WHERE id_usuario = ?")) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}