/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.modelos;

/**
 *
 * @author DELL
 */
public class Inscripcion {
    private Integer idInscripcion;
    private String periodo;
    private String estatus;
    private Integer creditosObtenidos;
    private String resultadoFinal;
    private Integer idUsuario;
    private Integer idGrupo;

    public Inscripcion() {}

    public Integer getIdInscripcion() { return idInscripcion; }
    public void setIdInscripcion(Integer idInscripcion) { this.idInscripcion = idInscripcion; }
    public String getPeriodo() { return periodo; }
    public void setPeriodo(String periodo) { this.periodo = periodo; }
    public String getEstatus() { return estatus; }
    public void setEstatus(String estatus) { this.estatus = estatus; }
    public Integer getCreditosObtenidos() { return creditosObtenidos; }
    public void setCreditosObtenidos(Integer creditosObtenidos) { this.creditosObtenidos = creditosObtenidos; }
    public String getResultadoFinal() { return resultadoFinal; }
    public void setResultadoFinal(String resultadoFinal) { this.resultadoFinal = resultadoFinal; }
    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }
    public Integer getIdGrupo() { return idGrupo; }
    public void setIdGrupo(Integer idGrupo) { this.idGrupo = idGrupo; }
}