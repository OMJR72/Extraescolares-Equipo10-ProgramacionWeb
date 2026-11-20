/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.modelos;

/**
 *
 * @author DELL
 */
public class Grupo {
    private Integer idGrupo;
    private String clave;
    private Integer cupoMaximo;
    private Integer cupoMinimo;
    private String genero;
    private Integer idActividad;
    private Integer idUsuario;

    public Grupo() {}

    public Integer getIdGrupo() { return idGrupo; }
    public void setIdGrupo(Integer idGrupo) { this.idGrupo = idGrupo; }
    public String getClave() { return clave; }
    public void setClave(String clave) { this.clave = clave; }
    public Integer getCupoMaximo() { return cupoMaximo; }
    public void setCupoMaximo(Integer cupoMaximo) { this.cupoMaximo = cupoMaximo; }
    public Integer getCupoMinimo() { return cupoMinimo; }
    public void setCupoMinimo(Integer cupoMinimo) { this.cupoMinimo = cupoMinimo; }
    public String getGenero() { return genero; }
    public void setGenero(String genero) { this.genero = genero; }
    public Integer getIdActividad() { return idActividad; }
    public void setIdActividad(Integer idActividad) { this.idActividad = idActividad; }
    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }
}