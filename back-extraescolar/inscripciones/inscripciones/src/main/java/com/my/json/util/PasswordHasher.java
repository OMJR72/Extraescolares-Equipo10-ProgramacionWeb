package com.my.json.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public final class PasswordHasher {

    private static final BCryptPasswordEncoder ENCODER = new BCryptPasswordEncoder();

    private PasswordHasher() {
    }

    public static String hash(String password) {
        return password == null ? null : ENCODER.encode(password);
    }

    public static boolean verificar(String password, String hash) {
        if (password == null || hash == null) return false;
        try {
            return ENCODER.matches(password, hash);
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
